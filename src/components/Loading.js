import smileImg from '../assets/smile.svg'
import theme from '../styles/theme';
const Loading = () => {
    return (
        <>
            <div style={{display:'flex',margin:'32px auto',alignItems:'center',fontSize:'24px',color:theme.color.background1}}>
                <img src={smileImg} style={{height:'36px',marginRight:'8px'}} />
                <div>loading ...</div>
            </div>
        </>
    )
}
export default Loading;