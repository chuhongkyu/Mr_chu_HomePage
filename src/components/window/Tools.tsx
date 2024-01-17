import { motion } from "framer-motion"
import styled from "styled-components"

const Badge = styled(motion.span)`
    padding: 0.1rem 0.6rem 0.18rem;
    border-radius: 25px;
    font-size: 13px;
    line-height: 130%;
    color: ${(props) => props.theme.white.lighter};
    background: ${(props) => props.theme.blue};
`

const Tools = (props:{ text: string }) => {
    const { text } = props

    const determineBadgeColor = (text: string): string => {
        let color
        switch (text) {
            case '리액트':
                color = 'rgb(46,142,214)'
                break;
            case 'NEXT.js':
                color = 'rgb(29, 29, 29)'
                break;
            case 'TS':
                color = 'rgb(48, 119, 196)'
                break;
            case 'vite':
                color = 'rgb(118, 74, 188)'
                break;
            case 'redux':
                color = 'rgb(118, 74, 188)'
                break;
            case 'JS':
                color = 'rgb(238,188,17)'
                break;
            case 'scss':
                color = 'rgb(192,63,128)'
                break;
            case 'styled-component':
                color = 'rgb(192,63,128)'
                break;
            case 'gsap':
                color = 'rgb(2, 110, 51)'
                break;
            case 'jsp':
                color = 'rgb(224,64,47)'
                break;
            default:
                color = 'rgb(121, 120, 120)'
                break;
        }
        return color;
    };

    return(
        <Badge style={{ background: determineBadgeColor(text) }}>
            {text}
        </Badge>
    )
}

export default Tools