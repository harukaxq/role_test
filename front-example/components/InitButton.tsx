'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const InitButton = () => {
  const supabase = createClientComponentClient()
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser()
  const submit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return
    // すでに登録済みの場合は何もしない
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
    console.log({
        users
    })

    if ((users??[]).length > 0) return
    const result = await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
      },
    ])
  }

  return (
    <button
      onClick={() => {
        submit()
      }}
    >
      Init
    </button>
  )
}
export default InitButton