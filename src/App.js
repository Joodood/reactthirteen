import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
const DATA = [
    {
        id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
        name: "Walmart",
        items: [
            { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
            { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
        ],
        tint: 1,
    },
    {
        id: "487f68b4-1746-438c-920e-d67b7df46247",
        name: "Indigo",
        items: [
            {
                id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
                name: "Designing Data Intensive Applications",
            },
            { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
        ],
        tint: 2,
    },
    {
        id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
        name: "Lowes",
        items: [
            { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
            { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
        ],
        tint: 3,
    },
];
//droppable = which droppable your draggong an item into
//index is the curretn index the draggablei is in
function App() {

    const [stores, setStores] = useState(DATA);

    const handleDragDrop = (results) => {
        // console.log("event into handleDragDrop: ", results);
        const {source, destination, type} = results;
        // console.log("stores: ", stores);
        //if the destination is null, not defined, return do nothing
        if (!destination) return;
        //if the dest and source have exacvt same droppable id and the same index, then do nothing, meaning you couldve dragged it and placed it where u started
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if (type === 'group') {
            //reordered stores equal original stores
            const reorderedStores = [...stores];
            //remove item with sourceindex of 0 (or whatever the index of the item being dragged) from array with source index of the dragged
            // ['walmart', 'indigo', 'lowes']
            // sourceindex = 0 = walmart
            const sourceIndex = source.index;
            //splice the element that is at sourceIndex and only that one element
            const [removedStore] = reorderedStores.splice(sourceIndex, 1);
            //returns
            //     console.log("removedStore: ", [removedStore])
            //add removedstore back onto the destination
            const destinationIndex = destination.index;
            // console.log(reorderedStores.splice(destinationIndex, 0, removedStore));
            reorderedStores.splice(destinationIndex, 0, removedStore);
            return setStores(reorderedStores);
        }
        //where original item lives
        const storeSourceIndex = stores.findIndex((store) => store.id === source.droppableId);
        //grab destination index
        const storeDestinationIndex = stores.findIndex((store) => store.id === destination.droppableId);
        // newSOurceITems is goign to equal items: ['workbench, etc']
        const newSourceItems = [...stores[storeSourceIndex].items]
        console.log("destination: " , destination, "source", source);
        const newDestinationItems = source.droppableId !== destination.droppableId ? [...stores[storeDestinationIndex].items] : newSourceItems;

        //new source item
        const [deletedItem] = newSourceItems.splice(source.index, 1)
        newDestinationItems.splice(destination.index, 0, deletedItem)

        //add bacl
        const newStores = [...stores];
        newStores[storeSourceIndex]  = {
            ...stores[storeSourceIndex],
            items: newSourceItems
        }
        newStores[storeDestinationIndex]  = {
            ...stores[storeDestinationIndex],
            items: newDestinationItems
        }

        setStores(newStores);

    };


    const LATA = [
        {
            id: "002f0db1-5457-46b0-949e-8032d2f9997a",
            name: "Social patterns",
            items: [
                { id: "24fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
                { id: "b239d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
            ],
            tint: 1,
        },
        {
            id: "4837f68b4-1746-438c-920e-d67b7df46247",
            name: "Kites",
            items: [
                {
                    id: "9f5ee6a5d-f927-4579-8c15-2b4eb86210ae",
                    name: "Designive Applications",
                },
                { id: "594eb-6bde-4411-b438-1c37fa6af364", name: "Atomibits" },
            ],
            tint: 2,
        },
        {
            id: "25da4t4ffdc-aae0-4d73-bd31-43f73101e7c0",
            name: "song",
            items: [
                { id: "960cbbcf-89a0-4d79-aa8e-56ab3bc15eacc", name: "Workbench" },
                { id: "d3edf796-6449-4931-a777-f5f66965a025b", name: "Hammer" },
            ],
            tint: 3,
        },
    ];


    // const [lores, setlores] = useState(LATA);
    //
    // // const handleDragDrop = (results) => {
    // //     console.log(results);
    //     const {source, destination, type} = results;
    //     // console.log("stores: ", stores);
    //     //if the destination is null, not defined, return do nothing
    //     if (!destination) return;
    //     //if the dest and source have exacvt same droppable id and the same index, then do nothing, meaning you couldve dragged it and placed it where u started
    //     if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    //
    //     if (type === 'group') {
    //         //reordered stores equal original stores
    //         const reorderedStores = [...lores];
    //         //remove item with sourceindex of 0 (or whatever the index of the item being dragged) from array with source index of the dragged
    //         // ['walmart', 'indigo', 'lowes']
    //         // sourceindex = 0 = walmart
    //         const sourceIndex = source.index;
    //         //splice the element that is at sourceIndex and only that one element
    //         const [removedStore] = reorderedStores.splice(sourceIndex, 1);
    //         //returns
    //         //     console.log("removedStore: ", [removedStore])
    //         //add removedstore back onto the destination
    //         const destinationIndex = destination.index;
    //         // console.log(reorderedStores.splice(destinationIndex, 0, removedStore));
    //         reorderedStores.splice(destinationIndex, 0, removedStore);
    //         return setlores(reorderedStores);
    //     }
    //     //where original item lives
    //     const storeSourceIndex = lores.findIndex((lores) => lores.id === source.droppableId);
    //     //grab destination index
    //     const storeDestinationIndex = lores.findIndex((store) => lores.id === destination.droppableId);
    //     // newSOurceITems is goign to equal items: ['workbench, etc']
    //     const newSourceItems = [...lores[storeSourceIndex].items]
    //     console.log("destination: " , destination, "source", source);
    //     const newDestinationItems = source.droppableId !== destination.droppableId ? [...lores[storeDestinationIndex].items] : newSourceItems;
    //
    //     //new source item
    //     const [deletedItem] = newSourceItems.splice(source.index, 1)
    //     newDestinationItems.splice(destination.index, 0, deletedItem)
    //
    //     //add bacl
    //     const newStores = [...lores];
    //     newStores[storeSourceIndex]  = {
    //         ...lores[storeSourceIndex],
    //         items: newSourceItems
    //     }
    //     newStores[storeDestinationIndex]  = {
    //         ...lores[storeDestinationIndex],
    //         items: newDestinationItems
    //     }
    //
    //     setlores(newStores);
    //
    // // };
    //





    //provided.placeholder - anytime we remove an element, its ganna add a placeholder element in there so the card shape dosent change with the storeheight
    return (
        <div className="layout__wrapper">
            <div className="card">
                <DragDropContext onDragEnd={handleDragDrop}>
                    <div className="header">
                        <h1>Shopping List</h1>
                    </div>
                    <Droppable droppableId="ROOT" type="group">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {stores.map((store, index) => (
                                    <Draggable draggableId={store.id} key={store.id} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.dragHandleProps} {...provided.draggableProps}
                                                ref={provided.innerRef}>
                                                {/*<h3>{store.name}</h3>*/}
                                                <StoreList {...store}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>


                    {/*<Droppable droppableId = "unassimilated">*/}
                    {/*    {stores.map(store => (*/}
                    {/*        <div className = "store-container">*/}
                    {/*            <h3>{store.name}</h3>*/}
                    {/*        </div>*/}
                    {/*    ) ) }*/}
                    {/*</Droppable>*/}
                </DragDropContext>
            </div>

        </div>
    );

}
    function StoreList({name, items, id}) {
        return (
            <Droppable droppableId = {id}>
                {(provided) => (
                    <div {...provided.droppableProps} ref = {provided.innerRef}>
                        <div className="store-container">
                            <h3>{name}</h3>
                        </div>
                        <div className="items-container">
                            {items.map((item, index) => (
                                <Draggable draggableId = {item.id} index = {index} key = {item.id}>
                                    {(provided) => (
                                        <div className="item-container" {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                                            <h4>{item.name}</h4>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>

                )}
            </Droppable>
        );
    }

export default App;

{/*<h3>{name}</h3>*/}
{/*<div className="store-container">*/}
{/*    <h3>{name}</h3>*/}
{/*</div>*/}
{/*<div className="items-container">*/}
{/*    {items.map((item, index) => (*/}
{/*        <div className="item-container">*/}
{/*            <h4>{item.name}</h4>*/}
{/*        </div>*/}
{/*    ))}*/}
{/*</div>*/}
// </Droppable>