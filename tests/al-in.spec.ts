import { test, expect } from '@playwright/test';
import { sendEmailNotification, sendErrorEmailNotification } from './emailHelper';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

test('should login to al-in and verify access', async ({ page }) => {
  try {
    await page.goto('https://al-in.fr/#/connexion-demandeur', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Vérifier que la page s'est chargée
    const content = await page.content();
    expect(content).toBeTruthy();

    await expect(page.getByText('Bienvenue sur votre espace')).toBeVisible();
    await expect(page.getByText('Se connecter')).toBeVisible();
    await page.getByRole('button', { name: 'Accepter tous les cookies' }).click();
    
    await page.locator('input[type="text"]').fill('wilfriedsoumagnin@gmail.com');
    await page.locator('input[type="password"]').fill('Akoua@2001');
    await page.getByRole('button', { name: 'JE ME CONNECTE' }).click();
    await page.waitForTimeout(10000);
    await expect(page.getByText('Communes demandées')).toBeVisible();
    
    // ✨ Récupérer la valeur des Communes demandées via le bloc exact
    const targetRow = page.locator('div.section', { hasText: 'Communes demandées' }).first();
    await expect(targetRow).toBeVisible({ timeout: 15000 });

    const communesElement = targetRow.locator('span').last();
    const communesText = (await communesElement.textContent())?.trim() || '0';
    const communesCount = parseInt(communesText.replace(/[^0-9]/g, ''), 10);

    console.log(`📍 Communes demandées: ${communesCount}`);
    
    // Vérifier si le nombre de communes est supérieur à 0
    if (communesCount > 0) {
      console.log(`✅ ${communesCount} communes demandées - Envoi d'un email...`);
      try {
        const emailSent = await sendEmailNotification(communesCount);
        if (emailSent) {
          console.log('📧 Email envoyé avec succès!');
          
          // 🔊 Jouer un son MP3 via VBScript (plus robuste)
          try {
            const mp3Path = 'C:\\Last_Last.mp3'; // À remplacer par ton chemin d'MP3
            
            // Vérifier que le fichier existe
            if (!fs.existsSync(mp3Path)) {
              console.error(`❌ Fichier non trouvé: ${mp3Path}`);
            } else {
              // Créer un script VBScript temporaire pour jouer le son
              const vbsScript = `
Set objShell = CreateObject("Shell.Application")
Set objPlayer = CreateObject("WMPlayer.OCX.7")
objPlayer.URL = "${mp3Path.replace(/\\/g, '\\\\')}"
objPlayer.controls.play
Do While objPlayer.playState <> 1
  WScript.Sleep 100
Loop
`;
              const vbsPath = path.join(process.cwd(), 'play_sound.vbs');
              fs.writeFileSync(vbsPath, vbsScript);
              
              await execAsync(`cscript.exe "${vbsPath}"`);
              fs.unlinkSync(vbsPath); // Supprimer le fichier temporaire
              console.log('🔊 Son joué avec succès!');
            }
          } catch (error) {
            console.error('❌ Erreur lors de la lecture du MP3:', error);
          }
        }
      } catch (error) {
        console.error('❌ Erreur lors de l\'envoi d\'email:', error);
      }
    } else {
      console.log('❌ 0 communes demandées - Pas d\'email envoyé');
    }
    
    expect(communesCount).toBeGreaterThanOrEqual(0);
  } catch (error) {
    console.error('❌ ERREUR CRITIQUE:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'Erreur inconnue');
    // Ne pas relancer l'erreur pour permettre au script .bat de relancer le test
    // Le script continuera à tourner même en cas d'erreur
    const errorEmailSent = await sendErrorEmailNotification();
    if (errorEmailSent) {
      console.log('📧 Email d\'erreur envoyé avec succès!');
    } 
  }
});

