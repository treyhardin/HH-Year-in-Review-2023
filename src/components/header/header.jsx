import Button from '../button/button'
import Icon from '../icon/icon'
import styles from './header.module.css'
import { createSignal, onMount } from 'solid-js'

export default function Header() {

    let headerRef;

    const [ showMenu, setShowMenu ] = createSignal(false)

    onMount(() => {
        window.addEventListener("click", (e) => {
            if (!headerRef.contains(e.target) && showMenu()) {
                // console.log('YUP')
                setShowMenu(false)
            }
        })
    })
    

    return (
        <header class={`${styles.header} ${showMenu() ? styles.active : ''}`} ref={headerRef}>

            <div class={styles.navigationMenu}>
                <div class={styles.navigationTitle}>
                    <div class={styles.navigationInfo}>
                        <a href="#" class={styles.logo}>
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 24">
                                <g clip-path="url(#a)">
                                    <path fill="color(display-p3 .149 .149 .2078)" d="M24.241 11.814c0-4.402-2.006-8.415-5.127-10.254a6.368 6.368 0 0 1 2.526-.538c2.155 0 4.18 1.133 5.722 3.195 1.542 2.062 2.396 4.755 2.396 7.597 0 2.842-.854 5.536-2.396 7.598-1.542 2.062-3.585 3.195-5.722 3.195a6.369 6.369 0 0 1-2.526-.539c3.12-1.839 5.127-5.851 5.127-10.254Zm-8.433 7.468c1.43-2.062 2.21-4.719 2.21-7.468 0-2.749-.78-5.405-2.21-7.467l.018-.037c.019-.038.037-.075.074-.093.762-1.022 1.654-1.82 2.62-2.36a8.678 8.678 0 0 1 2.619 2.36c1.542 2.062 2.396 4.755 2.396 7.597 0 2.842-.854 5.536-2.396 7.598-.762 1.021-1.653 1.82-2.62 2.359a8.679 8.679 0 0 1-2.618-2.36.403.403 0 0 0-.075-.092l-.018-.037Zm-.39.538c.743.948 1.579 1.69 2.526 2.248a6.368 6.368 0 0 1-2.526.539 6.368 6.368 0 0 1-2.527-.539c.929-.557 1.784-1.319 2.527-2.248ZM14.99 4.31l.019.037c-1.43 2.062-2.21 4.718-2.21 7.467 0 2.75.78 5.406 2.21 7.468l-.019.037a.407.407 0 0 1-.074.093c-.762 1.021-1.653 1.82-2.62 2.359a8.678 8.678 0 0 1-2.618-2.36C8.136 17.35 7.28 14.657 7.28 11.815c0-2.842.855-5.535 2.397-7.597.761-1.022 1.653-1.82 2.619-2.36.966.54 1.857 1.338 2.619 2.36.037.037.056.055.074.093Zm.428-.502c-.743-.947-1.58-1.69-2.527-2.248a6.368 6.368 0 0 1 2.527-.538c.854 0 1.709.185 2.526.538a9.031 9.031 0 0 0-2.526 2.248Zm1.894 8.006c0 2.49-.669 4.941-1.895 6.873-1.226-1.95-1.894-4.384-1.894-6.873s.668-4.94 1.895-6.873c1.226 1.932 1.894 4.384 1.894 6.873Zm-10.718 0c0 4.403 2.006 8.415 5.127 10.254a6.368 6.368 0 0 1-2.526.539c-2.155 0-4.18-1.133-5.722-3.195-1.542-2.062-2.396-4.756-2.396-7.598 0-2.842.854-5.535 2.396-7.597C5.015 2.155 7.04 1.022 9.195 1.022c.854 0 1.709.185 2.526.538C8.6 3.4 6.594 7.412 6.594 11.814ZM21.64.52a6.975 6.975 0 0 0-3.102.725A7.093 7.093 0 0 0 15.436.52a6.976 6.976 0 0 0-3.102.725A7.093 7.093 0 0 0 9.232.52C4.328.52.372 5.591.372 11.814c0 6.223 3.956 11.294 8.823 11.294a6.975 6.975 0 0 0 3.102-.724 7.093 7.093 0 0 0 3.102.724 6.975 6.975 0 0 0 3.102-.724 7.093 7.093 0 0 0 3.102.724c4.867 0 8.824-5.07 8.824-11.294C30.427 5.591 26.507.52 21.64.52Z"/>
                                </g>
                                <defs>
                                    <clipPath id="a">
                                    <path fill="currentColor" d="M0 0h30.817v24H0z"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <p>Half Helix</p>
                        </a>
                        <p class="color-subdued caption">2023 in Review</p>
                    </div>
                    <button class={styles.hamburger} onClick={() => setShowMenu(!showMenu())}>
                        <div class={styles.hamburgerLine}></div>
                        <div class={styles.hamburgerLine}></div>
                    </button>
                </div>
                <div class={styles.navigationDropdown}>
                    <nav class={styles.navigationLinks}>
                        <ul class="">
                            <li>
                                <a href="#work">
                                    Work
                                    <Icon glyph={"arrowDiagonal"} />
                                </a>
                            </li>
                            <li>
                                <a href="#work">
                                    Awards
                                    <Icon glyph={"arrowDiagonal"} />
                                </a>
                            </li>
                            <li>
                                <a href="#work">
                                    Events
                                    <Icon glyph={"arrowDiagonal"} />
                                </a>
                            </li>
                            <li>
                                <a href="#work">
                                    Team
                                    <Icon glyph={"arrowDiagonal"} />
                                </a>
                            </li>
                            <li>
                                <a href="#work">
                                    News
                                    <Icon glyph={"arrowDiagonal"} />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class={styles.contactMenu}>
                <p>Get in Touch</p>
                <div class={styles.contactLinks}>
                    <Button style="tertiary" text="Insta" link="#" />
                    <Button style="tertiary" text="Twitter" link="#" />
                    <Button style="tertiary" text="Contact" link="#" />
                </div>
            </div>
        </header>
    )

}