import React, {useState, useMemo, forwardRef, useImperativeHandle} from "react";
import { Button } from "antd";
import language from "../../lngProvider/locales/language";

const ConfirmModal = forwardRef(({content, button, confirmParent}, ref) => {

	const [modalConfig, setModalConfig] = useState({
		class: "modal",
		content: content
	});

	useMemo(()=>{
		setModalConfig({...modalConfig, content})
	}, [content])
	

	useImperativeHandle(ref, () => ({
		showModal(){
			setModalConfig({...modalConfig, class: "modal show"})
		},
		closeModal(){
			setModalConfig({...modalConfig, class: "modal"});
		}
	}));


	//Fonction pour fermer la modal
	const closeModal = () => {
		setModalConfig({...modalConfig, class: "modal"});
	};

	const confirmModal = () => {
		confirmParent();
		closeModal();
	}

	return(
		<div className={`${modalConfig.class}`}>
			<div className="container-relative ">
				<div id="confirm-content" className="center gx-card-widget gx-card-profile-sm">
					{modalConfig.content}
					{button ? 
						<div className="button-div-modal">
								<Button onClick={closeModal} size="small">{language["common.no"]} </Button>
								<Button type="primary" size="small" onClick={confirmModal}>{language["common.yes"]}</Button>
						</div>
					:
						<></>
					}
				</div>
			<div className="close-div" onClick={closeModal}></div>
			</div>
		</div>
)})

export default ConfirmModal;
