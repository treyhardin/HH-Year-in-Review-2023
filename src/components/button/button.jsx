
import Icon from '../icon/icon'
import styles from './button.module.css'

export default function Button({style, text, link}) {
    switch (style) {
        case 'primary':
            return (
                <button 
                    link={link} 
                    class={
                        `${styles.buttonPrimary} caption`
                    }
                    onClick={() =>{
                        window.open(link, '_blank').focus();
                    }}>
                    {text}
                    <div class={styles.icon}>
                        <Icon glyph={"arrowDiagonal"} />
                    </div>
                </button>
            )
        case 'secondary':
            return (
                <button link={link} class={`${styles.buttonSecondary} caption`}>{text}</button>
            )
        case 'tertiary':
            return (
                <button link={link} class={`${styles.buttonTertiary} caption`}>
                    <p class={styles.buttonText}>{text}</p>
                    <Icon glyph={"arrowDiagonal"} />
                </button>
            )
        default:
            return (
                <>
                <button link={link} class={styles.buttonPrimary}>{text}</button>
                </>
            )
    }
    
}