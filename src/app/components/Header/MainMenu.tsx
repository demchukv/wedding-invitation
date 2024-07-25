import Link from "next/link"

const MainMenu = () => {
  return (
      <div>
          <ul>
              <li>
                  <Link href="/">Home</Link>
              </li>
              <li>
                  <Link href="/about">About</Link>
              </li>
              <li>
                  <Link href="/templates">Templates</Link>
              </li>
          </ul>
    </div>
  )
}

export default MainMenu