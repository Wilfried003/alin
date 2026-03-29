/**
 * Utilitaire pour envoyer des notifications par email
 */

import nodemailer from 'nodemailer';

// Configuration des variables d'environnement
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'wilfriedsoumagnin@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'qgtd cqet unyg cmvg'; // Remplacez par votre mot de passe d'application ou mot de passe réel (non recommandé)
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'wilfriedsoumagnin@gmail.com';

/**
 * Envoie une notification par email
 * @param communesCount Nombre de communes demandées
 * @returns Promise<boolean> true si l'email a été envoyé
 */
export async function sendEmailNotification(communesCount: number): Promise<boolean> {
  try {
    // Vérifier que les variables d'environnement sont configurées
    if (!SMTP_USER || !SMTP_PASS || !RECIPIENT_EMAIL) {
      console.warn('⚠️  Configuration email incomplète (SMTP_USER, SMTP_PASS, RECIPIENT_EMAIL)');
      return false;
    }

    // Créer le transport SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true pour le port 465, false pour les autres
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Préparer le message
    const mailOptions = {
      from: SMTP_USER,
      to: RECIPIENT_EMAIL,
      subject: `🔔 AL-IN: Communes demandées = ${communesCount}`,
      html: `
        <h2>Alerte AL-IN</h2>
        <p>Le nombre de <strong>Communes demandées</strong> est passé à <strong>${communesCount}</strong></p>
        <hr />
        <p><em>Message généré automatiquement par les tests Playwright</em></p>
        <footer>
          <small>Date: ${new Date().toLocaleString('fr-FR')}</small>
        </footer>
      `,
      text: `AL-IN: Communes demandées = ${communesCount}\n\nMessage généré automatiquement par les tests Playwright`,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}

export async function sendErrorEmailNotification(): Promise<boolean> {
  try {
    // Vérifier que les variables d'environnement sont configurées
    if (!SMTP_USER || !SMTP_PASS || !RECIPIENT_EMAIL) {
      console.warn('⚠️  Configuration email incomplète (SMTP_USER, SMTP_PASS, RECIPIENT_EMAIL)');
      return false;
    }

    // Créer le transport SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true pour le port 465, false pour les autres
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Préparer le message
    const mailOptions = {
      from: SMTP_USER,
      to: RECIPIENT_EMAIL,
      subject: `🔔 AL-IN: Erreur détectée`,
      html: `
        <h2>Alerte AL-IN</h2>
        <p>Une erreur a été détectée dans le processus de test.</p>
        <hr />
        <p><em>Message généré automatiquement par les tests Playwright</em></p>
        <footer>
          <small>Date: ${new Date().toLocaleString('fr-FR')}</small>
        </footer>
      `,
      text: `AL-IN: Erreur détectée\n\nMessage généré automatiquement par les tests Playwright`,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}
