import { Icon, IconButton } from '@fluentui/react';
import React from 'react'
interface IpropsToDoSection {
  title: string;
  tasks: any[];
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: any;
  onDelete: any;
}
export const ToDoSection: React.FunctionComponent<IpropsToDoSection> = ({
  title,
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
      </div>

      <div className="todo-center">
        <div className='todoaligin'>
          <h3 className="task-title">{task.taskName}</h3>
          <div className="status-label">
            <span className={`status-dot ${task.status.toLowerCase()}`}></span>
            <span className="status-text">
               {task.status === "inprogress"? "In Progress" : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              {/* {task.status.charAt(0).toUpperCase() + task.status.slice(1)} */}
            </span>
          </div>

        </div>

        <span className="task-desc">{task.taskDesc}</span>
        <div className='todoaligin'>
          <p className="task-date">
            {new Date(task.date).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <div className="task-actions">
            <Icon iconName="Edit" onClick={() => onEdit(task)} className="edit-btn" />
            <Icon iconName='Delete' onClick={() => onDelete(task.id)} className="delete-btn" />
          </div>
        </div>

      </div>
    </div>
  );


  return (
    <div className="todo-section">
      <div className="section-header" onClick={onToggle}>
        <span style={{ fontWeight: "500" }}>
          {title} {" "}
          <span style={{ fontWeight: 600 }}>({tasks?.length})</span>
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