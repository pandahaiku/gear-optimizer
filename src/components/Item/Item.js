import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Item.css';

function importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
                images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = r(item);
                return undefined;
        });
        return images;
}
const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));

export default class Item extends Component {
        static propTypes = {
                item: PropTypes.shape({name: PropTypes.string.isRequired, level: PropTypes.number.isRequired}),
                handleClickItem: PropTypes.func.isRequired,
                handleRightClickItem: PropTypes.func.isRequired,
                handleDoubleClickItem: PropTypes.func.isRequired
        };

        render() {
                let item = this.props.item;

                let classNames = 'item';
                if (item === undefined) {
                        return (<span><img className={classNames} data-tip='Empty slot' src={images.logo} alt='Empty'/>
                        </span>);
                }
                let tt = item.name + ' lvl ' + item.level + '<br />';
                item.statnames.map((stat, idx) => {
                        tt += '<br />' + stat + ': ' + item[stat];
                        return undefined;
                })
                classNames += item.disable
                        ? ' disable-item '
                        : '';
                return (<img className={classNames} onClick={() => this.props.handleClickItem(item.name)} onContextMenu={(e) => {
                                this.props.handleRightClickItem(item.name, true);
                                e.preventDefault();
                        }} onDoubleClick={() => this.props.handleDoubleClickItem(item.name)} data-tip={tt} src={images[item.name]} alt={item.name} key='item'/>);
        }
}