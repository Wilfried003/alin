
Set objShell = CreateObject("Shell.Application")
Set objPlayer = CreateObject("WMPlayer.OCX.7")
objPlayer.URL = "C:\\Last_Last.mp3"
objPlayer.controls.play
Do While objPlayer.playState <> 1
  WScript.Sleep 100
Loop
