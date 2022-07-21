import { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import './style.css';

const Browse = ({ children, maxHeight = '50vh' }) => {
	const ref = useRef();

	useEffect(() => {
		ref.current.recalculate();
		const scrollWrapper = ref.current.el;
		const scrollEl = scrollWrapper.querySelector('.simplebar-vertical').firstChild

		toggleScrollState(scrollWrapper, scrollEl.style.height !== '0px');

		ref.current.getScrollElement().addEventListener('scroll', handleScroll);
		return () => { ref.current.getScrollElement().removeEventListener('scroll', handleScroll) }
	})

	const handleScroll = () => {
		const scrollWrapper = ref.current.el;
		const scrollEl = scrollWrapper.querySelector('.simplebar-vertical').firstChild
		const offset = parseFloat(scrollEl.style.transform.split(',')[1].trim().replace('px', ''));
		let hasMore = scrollEl.style.height !== '0px';

		if(scrollWrapper.clientHeight - scrollEl.clientHeight > offset + 10) {
			hasMore = true;
		}else {
			hasMore = false;
		}
		toggleScrollState(scrollWrapper, hasMore);
	}

	const toggleScrollState = (el, flag) => {
		if(flag) {
			el.classList.add('has-scrollable-items')
		} else {
			el.classList.remove('has-scrollable-items')
		}
	}

	return (
		<SimpleBar ref={ref} style={{ maxHeight }} forceVisible="y" autoHide timeout={400}>
			<ul className="browse-results">{ children }</ul>
		</SimpleBar>
	)
}

export default Browse
