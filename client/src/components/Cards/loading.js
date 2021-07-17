import { Fragment} from "react";
import logo from './loading.gif'
const Loading = () => {
    return ( 
        <Fragment>
            <img src={logo} width='100px' height='100px' alt='loading'/>
        </Fragment>
     );
}
 
export default Loading;