import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const calculateAge = (birthDateStr: string): number => {
  const today = new Date()
  const birthDate = new Date(birthDateStr)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

const Profile: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const age = calculateAge("2001-02-19")

  return (
    <div class={classNames(displayClass, "profile-container")}>
      <div class="profile-text">
        <strong>Kim SangWoo</strong> ({age})
        <div class="profile-bio">
          Code Enthusiast on an extended coffee break
        </div>
      </div>
    </div>
  )
}

Profile.css = `
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.profile-text {
  font-size: 1.2rem;
}

.profile-bio {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #555;
}
`

export default (() => Profile) satisfies QuartzComponentConstructor
