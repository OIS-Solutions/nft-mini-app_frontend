import Cookies from "js-cookie"

export class CookieValue {
    private cookieName
    constructor(name: string) {
        this.cookieName = name
    }

    setValue = (value: string) => {
        Cookies.set(this.cookieName, value)
    }

    getValue = ():string | undefined => {
        return Cookies.get(this.cookieName) || undefined
    }

    deleteValue = () => Cookies.remove(this.cookieName)
}

export const tokenCookie = new CookieValue("token");