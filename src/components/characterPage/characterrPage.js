import React from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from "../errorMessage";
import gotService from "../services/gotService";
import RowBlock from "../RowBlock/RowBlock";




export default class CharacterPage extends React.Component {
    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList =(
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacter}
                renderItem={({name,gender}) => `${name} (${gender})`}
            />
        )


        const charDetails = (
            <ItemDetails charId = {this.state.selectedChar} >
                <Field field={'gender'} label={'Gender'}/>
                <Field field={'born'} label={'Born'}/>
                <Field field={'died'} label={'Died'}/>
                <Field field={'culture'} label={'Culture'}/>
            </ItemDetails>

        )

        return (
           <RowBlock left={itemList} right={charDetails} />
        )
    }
}