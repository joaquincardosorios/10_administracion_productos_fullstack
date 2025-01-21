export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-CL',{
        style: 'currency',
        currency: 'CLP',
    }).format(amount)
}

export function toBoolean(str: string){
    return str.toLocaleLowerCase() === 'true'
}