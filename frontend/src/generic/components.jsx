import { memo } from "react";

const List = memo(({ list }) => {
    let count = 0;
    return (
        <div id="styled-gen-list">
        <ul>
            {list.map((item) => (
                <Item key={count++} item={item}/>
            ))}
        </ul>
        </div>
    );
});

const Item = memo(({ item }) => {
    return (
    <li>
        <span>{item.exercise}</span>&nbsp;
        <span>{item.reps} </span>&nbsp;
        <span>{item?.superset}</span>&nbsp;
    </li>
)});



export { List };