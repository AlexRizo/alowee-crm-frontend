export const validateFile = (file) => {
    if (!file) return true;
    
    const allowedTypes = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip', 'rar', 'nef', 'mp4', 'mov', 'mp3', 'csv'];
    const type = file[0].name.split('.').pop().toLowerCase();
    const maxSize = 1024 * 1024 * 10; //? 10MB
    
    if (!allowedTypes.includes(type)) return 'Tipo de archivo no permitido. Sólo se permiten archivos de tipo: ' + allowedTypes.join(', ');
    if (file[0].size > maxSize) return 'El archivo excede el tamaño permitido. Sólo se permiten archivos de hasta ' + maxSize / 1024 / 1024 + ' MB';
};