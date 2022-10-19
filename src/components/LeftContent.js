import { FaRegLaugh, FaRegMeh } from 'react-icons/fa';
import styled from 'styled-components';

const Wrappers = styled.div`
width:${props=>props.width}%;
min-height:100vh;
display:flex;
text-align:center;
background:${props=>props.theme.color.background4};
color:${props=>props.theme.color.background1};
font-size:50px;
@media screen and (max-width: 800px) {
    position:fixed;
    height:5rem;
    width:100%;
    font-size:24px;
    display:none;
}
`
const TextContent = styled.div`
display: flex;
flex-direction: column;
margin: auto;
@media screen and (max-width: 800px) {
    flex-direction: row;
    align-items:center;
}
`
const IconContainer = styled.div`
display: flex;
justify-content:space-between;
font-size:69px;
width:160px;
margin:0 auto;
@media screen and (max-width: 800px) {
    font-size:36px;
    width:78px;
    margin-right:8px;
}
`
const Text = styled.div`
@media screen and (max-width: 800px) {
    margin-right:8px;
}
`
const LeftContent = (props) => {
    let {width} = props;
    return (
        <>
            <Wrappers width={width}>
                <TextContent>
                    <IconContainer>
                        <FaRegLaugh /><FaRegMeh />
                    </IconContainer>
                    <Text>To do</Text>
                    <Text>or</Text>
                    <Text>Not to do</Text>
                    <Text>List</Text>
                </TextContent>
            </Wrappers>
        </>
    )
}
export default LeftContent;