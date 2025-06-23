'use server'
import clientPromise from '../libs/mongodb' 
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginAction(formData) {
  const email = formData.get('email')?.trim()
  const senha = formData.get('senha')?.trim()

  if (!email || !senha) {
    return { error: 'E‑mail e senha são obrigatórios' }
  }

  const client = await clientPromise
  const db = client.db()
  const user = await db.collection('users').findOne({ email })
  if (!user) return { error: 'Email ou senha inválidos' }

  const valid = await compare(senha, user.password)
  if (!valid) return { error: 'Email ou senha inválidos' }

  redirect('/dashboard')
}
