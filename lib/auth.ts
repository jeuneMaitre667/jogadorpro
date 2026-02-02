/**
 * Service d'Authentification
 * Centralise toute la logique d'authentification Supabase
 */

import { supabase } from './supabase'
import { User } from './types'

export const authService = {
  /**
   * Récupère l'utilisateur actuellement authentifié
   */
  async getUser(): Promise<User | null> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      console.error('Error fetching user:', error?.message)
      return null
    }

    return {
      id: user.id,
      email: user.email || '',
      role: 'trader', // À récupérer de la table users si nécessaire
      kyc_status: 'pending',
    }
  },

  /**
   * Connexion avec email et mot de passe
   */
  async signIn(
    email: string,
    password: string
  ): Promise<{ error?: string; success: boolean; user?: User }> {
    try {
      const { error: loginError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        return { error: loginError.message, success: false }
      }

      if (data.user) {
        // Vérifier si l'utilisateur existe dans la table profiles
        const { data: existingUser, error: userError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (userError && userError.code === 'PGRST116') {
          // Utilisateur n'existe pas, le créer
          await supabase.from('profiles').insert([
            {
              id: data.user.id,
              email: data.user.email,
              role: 'trader',
              kyc_status: 'pending',
            },
          ])
        }

        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email || '',
            role: 'trader',
            kyc_status: 'pending',
          },
        }
      }

      return { success: true }
    } catch (err: any) {
      return { error: err.message, success: false }
    }
  },

  /**
   * Inscription avec email et mot de passe
   */
  async signUp(
    email: string,
    password: string,
    fullName: string
  ): Promise<{ error?: string; success: boolean; user?: User }> {
    try {
      const { data: authData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (signupError) {
        return { error: signupError.message, success: false }
      }

      if (authData.user) {
        // Créer l'entrée dans la table profiles
        const { error: userError } = await supabase.from('profiles').insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            full_name: fullName,
            role: 'trader',
            kyc_status: 'pending',
          },
        ])

        if (userError) {
          console.error('Error creating user profile:', userError.message)
          // Continuer quand même, l'utilisateur peut se connecter
        }

        return {
          success: true,
          user: {
            id: authData.user.id,
            email: authData.user.email || '',
            role: 'trader',
            kyc_status: 'pending',
          },
        }
      }

      return { success: true }
    } catch (err: any) {
      return { error: err.message, success: false }
    }
  },

  /**
   * Déconnexion
   */
  async signOut(): Promise<{ error?: string; success: boolean }> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { error: error.message, success: false }
      }

      return { success: true }
    } catch (err: any) {
      return { error: err.message, success: false }
    }
  },
}
