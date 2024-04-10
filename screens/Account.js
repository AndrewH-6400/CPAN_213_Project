import { Text, View } from "react-native-elements"
import { useSelector } from "react-redux"
import { registerUser } from "../redux_store/actions/userRegAction";

const Account = () => {
    const user = useSelector(state => state.user.user)

    return(
        <View>
            <Text>Help is this working</Text>            
        </View>
    )
}

export default Account;