import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0
        };
    };
    handleIconOpacity(value) {
        const opacitys = {
            "hide": 0,
            "trans": .2,
            "show": 1
        };
        this.setState({ opacity: opacitys[value] });
    };
    render() {
        const { entry, editEntry } = this.props;
        const { opacity } = this.state;
        return (
            <tr
                key={entry.id}
                onMouseLeave={() => this.handleIconOpacity("hide")}
                onMouseEnter={() => this.handleIconOpacity("trans")}
            >
                <td>
                    <span className="icon-text">
                        <span>{entry.title}</span>
                        <span
                            onMouseLeave={() => this.handleIconOpacity("trans")}
                            onMouseEnter={() => this.handleIconOpacity("show")}
                            className="icon"
                            style={{ cursor: 'pointer', opacity }}
                            onClick={() => editEntry(entry.id)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-pen" />
                        </span>
                    </span>
                </td>
                <td className='has-text-right'>{entry.created_at}</td>
            </tr>
        );
    }
}

export default Row;
