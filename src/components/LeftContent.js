import { FaRegLaugh, FaRegMeh } from 'react-icons/fa';
import styled from 'styled-components';

const Wrappers = styled.div`
width:35%;
height:100vh;
display:flex;
text-align:center;
background:${props=>props.theme.color.background4};
color:${props=>props.theme.color.background1};
font-size:50px;
@media screen and (max-width: 800px) {
    display:none;
}
`
const LeftContent = (props) => {
    let {width} = props;
    return (
        <>
            <Wrappers style={{width:`${width?width:'35'}%`}}>
                <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                    <div style={{ display: 'flex',justifyContent:'space-between',fontSize:'69px',width:'160px',margin:'0 auto' }}>
                        <FaRegLaugh /><FaRegMeh />
                    </div>
                    <div>To do</div>
                    <div>or</div>
                    <div>Not to do</div>
                    <div>List</div>
                </div>
            </Wrappers>
        </>
    )
}
export default LeftContent;