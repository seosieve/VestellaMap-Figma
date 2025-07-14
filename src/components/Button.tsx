import React from 'react'

interface ButtonProps {
    title: string
}

const Button: React.FC<ButtonProps> = ({ title }) => {
    return (
        <button style={styles.button}>{title}</button>
    )
}

const styles = {
    button: {
        width: '100%',
        height: '36px',
        backgroundColor: '#31DD9E',
        color: '#05130E',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }
}

export default Button;