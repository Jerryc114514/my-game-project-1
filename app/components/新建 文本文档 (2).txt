export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="border border-gray-300 p-2 rounded"
      {...props}
    />
  )
}
