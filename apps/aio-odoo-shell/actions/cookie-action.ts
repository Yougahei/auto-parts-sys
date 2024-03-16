'use server'

import { cookies } from 'next/headers'

export async function deleteCookie(name: string) {
    cookies().delete(name)
}

export async function setCookie(name: string, value: string) {
    cookies().set(name, value)
}

export async function setCookieByDay(name: string, value: string, days: number = 1) {
    const oneDay = days * 24 * 60 * 60 * 1000
    cookies().set('name', 'value', { expires: Date.now() - oneDay })
}

export async function getCookie(name: string) {
    return cookies().get(name)
}
