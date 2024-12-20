const forbiddenExtensions = [
  // Archivos ejecutables y de scripts
  '.exe', '.bat', '.msi', '.sh',
  '.apk', '.bin', '.cmd', '.vbs',
  '.ps1', '.psm1', '.psd1', '.scr',
  '.com', '.jar', '.js', '.dll',
  '.py', '.php', '.rb', '.xpi',
  '.crx',

  // Archivos comprimidos y contenedores
  '.zip', '.rar', '.7z', '.tar',
  '.iso', '.img', '.dmg',

  // Archivos de configuración y registros
  '.inf', '.reg', '.scf', '.lnk',

  // Documentos de Office (por riesgo de macros)
  '.doc', '.xls', '.ppt', '.pdf',

  // Archivos de código fuente
  '.c', '.cpp', '.h', '.hpp', '.cs',
  '.java', '.class',

  // Otras extensiones a considerar
  '.torrent', '.svg'
]

function hasForbiddenExtension (url) {
  try {
    const urlPath = new URL(url).pathname
    const extension = urlPath.split('.').pop()
    return forbiddenExtensions.includes(`.${extension}`)
  } catch (error) {
    console.log('Error en la función hasForbiddenExtension:', error)
    return true
  }
}

export const checkForbiddenExtension = (req, res, next) => {
  const { originalUrl } = req.body

  if (hasForbiddenExtension(originalUrl)) {
    return res.status(400).json({ message: 'Forbidden extension.' })
  }
  next()
}