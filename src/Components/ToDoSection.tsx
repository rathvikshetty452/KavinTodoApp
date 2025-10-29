import { FontIcon, IconButton } from '@fluentui/react';
import React from 'react'
import { useTodoStore } from '../store/useTodoStore';
interface IpropsToDoSection {
    key: string;
    title: string;
    statusKey: string;
    tasks: any[];
    isExpanded: boolean;
    onToggle: () => void;
      onEdit:any;
     onDelete:any;
}
export const ToDoSection: React.FunctionComponent<IpropsToDoSection> = ({
    key,
    title,
    statusKey,
    tasks,
    isExpanded,
    onToggle,
    onEdit,
    onDelete,
}) => {
  
const renderTaskCard = (task: any) => (
  <div key={task.id} className="todo-card">
    <div className="todo-left">
      <div className="task-avatar">{task.taskName.charAt(0).toUpperCase()}</div>
      <FontIcon iconName="Clock" className="task-icon" />
    </div>

    <div className="todo-center">
      <h4 className="task-title">{task.taskName}</h4>
      <p className="task-desc">{task.taskDesc}</p>
      <p className="task-date">
        {new Date(task.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>

    <div className="todo-right">
      <span className={`status-label ${task.status}`}>
        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </span>
      <div className="task-actions">
        <IconButton iconProps={{ iconName: "Edit" }} className="edit-btn" onClick={()=>onEdit(task)}/>
        <IconButton iconProps={{ iconName: "Delete" }} className="delete-btn" onClick={() => onDelete(task.id)}/>
      </div>
    </div>
  </div>
);


    return (
       <div className="todo-section">
      <div className="section-header" onClick={onToggle}>
                <span>
                    {title}({tasks?.length})
                </span>
                <IconButton
                    iconProps={{
                        iconName: isExpanded ? "ChevronUp" : "ChevronDown",
                    }}
                    styles={{
                        root: { color: "#0078d4", background: "transparent" },
                    }}
                />
            </div>
              {isExpanded && (
        <div className="section-content">
          {tasks.length === 0 ? (
            <p className="empty-text">No tasks available</p>
          ) : (
            tasks.map(renderTaskCard)
          )}
        </div>
      )}
        </div>
    )
}
export default ToDoSection