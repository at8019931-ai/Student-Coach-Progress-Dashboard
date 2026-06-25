import { redirect } from 'next/navigation'

export default function SetupRequired() {
  redirect('/admin')
}
