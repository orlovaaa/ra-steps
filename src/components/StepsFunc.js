import { useState } from 'react'; 
import Item from './ItemFunc';
import shortid from 'shortid';

export default function Steps() {
    const [steps, setSteps] = useState({
        updateItemId: null,
        date: '',
        distance: '',
    })

    const [list, setList] = useState([])

    list.sort((a, b) => {
        const aDate = a.date.split('.').reverse().join('-')
        const bDate = b.date.split('.').reverse().join('-')

        return new Date(aDate) - new Date(bDate)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const date = steps.date.split('.');
        if (date[2].length < 4) {
            date[2] = '20' + date[2];
        }
    
        const newItem = { id: shortid.generate(), date: date.join('.'), distance: Number(steps.distance) };

        if(steps.updateItemId) {
            newItem.id = steps.updateItemId
            handleClickDelete(steps.updateItemId)
        }

        const toDateItem = list.filter(item => item.date === newItem.date)

        if(toDateItem[0] && !steps.updateItemId) {
            newItem.id = toDateItem[0].id
            newItem.distance += Number(toDateItem[0].distance);
            newItem.distance = newItem.distance.toFixed(1)
            if (newItem.distance > 100) {
                newItem.distance = 100
            }
            handleClickDelete(toDateItem[0].id)
        }

        setList((prevList => [...prevList, newItem]));
        setSteps({
            updateItemId: null,
            date: '',
            distance: '',
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSteps(prevSteps => ({...prevSteps, [name]: value}));
    }

    const handleClickDelete = (item) => {
        const newList = list.filter(el => el.id !== item)
        setList(newList);
    }

    const handleClickUpdate = (item) => {
        const updateItem = list.filter(el => el.id === item)[0]
        setSteps({
            updateItemId: updateItem.id,
            date: updateItem.date.slice(0,6) + updateItem.date.slice(8,10),
            distance: updateItem.distance,
        })
    }

    return (
        <div className="container-steps">
            <form className="form-steps" onSubmit={handleSubmit}>
                <label className='label-steps'>
                    <span>Дата (ДД.ММ.ГГ)</span>
                    <input className="input-date" name='date' required pattern="[0-3]{1}[0-9]{1}.[0-1]{1}[0-9]{1}.[0-2]{1}[0-9]{1}" value={steps.date} onChange={handleChange}></input>
                </label>
                <label className='label-steps'>
                    <span>{'Пройдено км (<100)'}</span>
                    <input className="input-distance" name='distance' required pattern='^0*(?:[1-9]*[.][0-9]*[.]?|100)$|^0*(?:[1-9][0-9]?|100)$' value={steps.distance} onChange={handleChange}></input>
                </label>
                <button className='form-btn'>OK</button>
            </form>
            <div className="container-list">
                <div className="titles-list">
                    <p className="title">
                        Дата (ДД.ММ.ГГ)
                    </p>
                    <p className="title">
                        Пройдено км
                    </p>
                    <p className="title">
                        Действия
                    </p>
                </div>
                <div className="list-items">
                    {list.map(item => <Item 
                        key={item.id} 
                        steps={item} 
                        handleClickDelete={handleClickDelete}
                        handleClickUpdate={handleClickUpdate}
                    />)}
                </div>
            </div>
        </div>
    )
}