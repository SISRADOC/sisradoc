// Arquivo para tratamento de exceções personalizadas em toda a aplicação

const ExtractionError = (message)=>({
    error: new Error(message),
    code: 'VALIDATION_ERROR'
});

const ProcessPDFError = (message) => ({
    error: new Error(message),
    code: 'PROCESS_PDF_ERROR'
})

const DailyClassError = (message) => ({
    error: new Error(message),
    code: 'DAILY_CLASS_ERROR'
})

const PermissionError = (message)=>({
    error: new Error(message),
    code: 'PERMISSION_ERROR'
});

const ExecutionError = (message)=>({
    error: new Error(message),
    code: 'EXECUTION_ERROR'
});