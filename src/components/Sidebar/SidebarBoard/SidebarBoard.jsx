import clsx from "clsx";
import css from "./SidebarBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/theme/selectors";
import { NavLink } from "react-router-dom";
import staticIcons from "../../../assets/icons.svg"
import { deleteBoard, getAllBoards } from "../../../redux/boards/operations"
import UpdateBoard from "./UpdateModal/UpdateBoard";
import { useState } from "react";

export default function SidebarBoard({ title, icon, id, isActive }) {

    const [isEdit, setIsEdit] = useState(false);
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteBoard(id)).unwrap();
        await dispatch(getAllBoards()).unwrap();
    }

    return (<>

        {isActive
            ?
            <div to={`/home/${id}`} className={clsx(css.mainBox, css[theme], isActive && css.active)}>
                <div className={css.box}>
                    <div className={css.infoBox}>
                        <svg className={clsx(css.icon, css[theme], isActive && css.active)}>
                            <use href={`${staticIcons}#${icon}`}></use>
                        </svg>
                        <p className={clsx(css.title, css[theme], isActive && css.active)}>{title}</p>
                    </div>

                    <div className={clsx(css.btnBox, css[theme], isActive && css.active)}>
                        {/*onClick={() => setIsEdit(!isEdit)}*/}
                        <button className={clsx(css.btn, isActive && css.active)} type="button">
                            <svg className={clsx(css.btnIcon, css[theme])} >
                                <use href={`${staticIcons}#icon-pencil`}></use>
                            </svg>
                        </button>

                        <button className={clsx(css.btn, isActive && css.active)} onClick={handleDelete} type="button">
                            <svg className={clsx(css.btnIcon, css[theme])} >
                                <use href={`${staticIcons}#icon-trash`}></use>
                            </svg>
                        </button>
                    </div>
                </div>
                {isActive && <div className={clsx(css.stick, css[theme])}></div>}
            </div >
            :
            <NavLink to={`/home/${id}`} className={clsx(css.mainBox, css[theme], isActive && css.active)}>
                <div className={css.box}>
                    <div className={css.infoBox}>
                        <svg className={clsx(css.icon, css[theme], isActive && css.active)}>
                            <use href={`${staticIcons}#${icon}`}></use>
                        </svg>
                        <p className={clsx(css.title, css[theme], isActive && css.active)}>{title}</p>
                    </div>
                </div>
            </NavLink >}

        {isEdit && <UpdateBoard setIsEdit={setIsEdit} id={id} />}
    </>
    )
}