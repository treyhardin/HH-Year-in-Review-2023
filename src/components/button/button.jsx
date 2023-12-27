
import Icon from '../icon/icon'
import styles from './button.module.css'

export default function Button(props) {
    switch (props.style) {
        case 'primary':
            return (
                <button 
                    // link={props.link} 
                    class={
                        `${styles.buttonPrimary} caption`
                    }
                    onClick={() =>{
                        window.open(props.link, '_blank').focus();
                    }}
                >
                    {props.text}
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
                <button 
                    link={props.link} 
                    class={`${styles.buttonTertiary} caption`}
                    onClick={() =>{
                        window.open(props.link, '_blank').focus();
                    }}
                >
                    <p class={styles.buttonText}>{props.text}</p>
                    <Icon glyph={"arrowDiagonal"} />
                </button>
            )
        default:
            return (
                <>
                <button 
                    link={props.link} 
                    class={styles.buttonPrimary}
                >
                        {props.text}
                </button>
                </>
            )
    }
    
}