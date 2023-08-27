export const scrollToForm = (formRef) => {
    if(formRef && formRef.current){
        formRef.current.scrollIntoView({behavior: 'smooth'})
    }
}