import store from '../store'
export default function dateFilter(value,format="date"){
    console.log();
    const options={

    }
    if(format.includes('date')){
        options.day='2-digit'
        options.day='2-long'
        options.day='numeric'
    }
    if(format.includes('time')){
        options.day='2-digit'
        options.day='2-digit'
        options.day='2-digit'
    }
    const locale=store.getters.info || 'ru-RU'
    return new Intl.DateTimeFormat(locale,options).format(new Date(value))
}