import React from 'react'

interface Props {
  data: { id: number; name: string; value: string }[]
  handleChange: (name: string) => void
}

const Dropdown = (props: Props) => {
  const { data = [], handleChange } = props
  return (
    <div className="relative w-full mb-5">
      <select
        onChange={(event) => handleChange(event.target.value)}
        className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
      >
        {data.map((item) => {
          return (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Dropdown
