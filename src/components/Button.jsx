import { applyProps } from '@react-three/fiber';
import React from 'react';


export default function Button(props){
    return <form action="https://github.com/Rguarnizo/Rguarnizo/raw/main/CV.pdf">
        <button className='btn-primary'>
            {props.children}
        </button>
    </form>
}