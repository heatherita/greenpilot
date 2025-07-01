import React, { useState } from "react"

export default function Menu({ setAnswer }) {
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/data/add", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    setStatus(data)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <button type="submit" className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
        Add new data
      </button>
    </form>
  )
}

