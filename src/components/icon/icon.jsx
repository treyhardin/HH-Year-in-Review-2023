export default function Icon({glyph}) {

    switch (glyph) {
        case "arrowDiagonal":
            return ( 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26">
                    <path stroke="currentColor" d="M1 1h24m0 0v24m0-24C17.456 8.726 2.094 24.344 1 25"/>
                </svg>
            )
        default:
            return ( 
                <p></p>
            )
          
    }
}