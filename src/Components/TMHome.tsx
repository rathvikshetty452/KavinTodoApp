
import * as React from 'react'
import { DefaultButton, initializeIcons, SearchBox } from "@fluentui/react";
import { initialitem, searchBoxStyles } from './Commonfunction';
import "../App.css"
import ToDoSection from './ToDoSection';
import { useBoolean } from '@fluentui/react-hooks';
import AddEdit from './AddEdit';
import { useTodoStore } from '../store/useTodoStore';
export const TMHome: React.FunctionComponent = () => {
    initializeIcons();
    const todos = useTodoStore(c => c.todos)
    const removeTodo = useTodoStore((c) => c.removeTodo)
    const [allitems, setAllitems] = React.useState<any>([])
    const [selectedTask, setSelectedTask] = React.useState<any>(null);
    const [expandedSections, setExpandedSections] = React.useState<any>({
        Pending: true,
        inprogress: true,
        Completed: true,
    });
    const [searchitem, setSearchitem] = React.useState<any>("")
    const [isOpen, { toggle: toggleOpen }] = useBoolean(false)
    const [mode, setMode] = React.useState<"add" | "edit">("add");
    const HandleSearch = (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => {
        setSearchitem((newValue || "").trimStart());
    };
    const sections = [
        { title: "In Progress", statusKey: "inprogress" },
        { title: "Pending", statusKey: "pending" },
        { title: "Completed", statusKey: "completed" },
    ];
    const toggleSection = (key: any) => {
        setExpandedSections((prev: any) => ({
            ...prev,
            [key]: !prev[key]
        }))
    }
    const filterTasksByStatus = (status: string) =>
        allitems.filter(
            (item: any) =>
                item.status.toLowerCase() === status &&
                item.taskName.toLowerCase().includes(searchitem.toLowerCase())
        );
    const handleEdit = (task: any) => {
        setSelectedTask(task);
        setMode("edit");
        toggleOpen();
    };
    const handleDelete = (id: any) => {
        removeTodo(id)
    };

    React.useEffect(() => {
        setAllitems(todos)
    }, [todos])
    const addTodoTask = () => {
        setMode("add");
        toggleOpen();
    }
    return (
        <>
            <div className='centerpage todo-app'>
                <header className="header">TODO APP</header>
                <div className='searchmargin'>
                    <SearchBox
                        placeholder='Search To-Do'
                        value={searchitem}
                        onChange={HandleSearch}
                        styles={searchBoxStyles}
                    />
                </div>
                {sections.map((section: any) => (
                    <ToDoSection
                        title={section.title}
                        tasks={filterTasksByStatus(section.statusKey)}
                        isExpanded={expandedSections[section.statusKey]}
                        onToggle={() => toggleSection(section.statusKey)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
                <div className='customCircularButton'>
                    <DefaultButton
                        id="addicon"
                        iconProps={{ iconName: "Add" }}
                        onClick={() => addTodoTask()}
                        //  menuProps={menuProps}
                        styles={{
                            root: {
                                color: "white",
                                padding: "0px",
                                minWidth: "0px",
                                height: "50px",
                                width: "50px",
                                borderRadius: "50%",
                            },
                        }}
                    />
                </div>
                {isOpen &&
                    <AddEdit
                        mode={mode}
                        isOpen={isOpen}
                        onDismiss={toggleOpen}
                        taskData={selectedTask}
                    />
                }

            </div>
        </>
    )
}

export default TMHome