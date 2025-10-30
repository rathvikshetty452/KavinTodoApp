import { DefaultButton, Dropdown, Panel, PrimaryButton, PanelType, TextField, type IDropdownOption, MessageBar, MessageBarType } from '@fluentui/react'
import React from 'react'
import { useTodoStore } from '../store/useTodoStore';

interface AddEditprops {
  isOpen: boolean;
  mode: "add" | "edit";
  taskData?: any;
  onDismiss: () => void;
}
const statusOptions: IDropdownOption[] = [
  { key: "inprogress", text: "In Progress" },
  { key: "Pending", text: "Pending" },
  { key: "Completed", text: "Completed" },
];
type MessageType = "success" | "error" | null;
const AddEdit: React.FC<AddEditprops> = ({
  isOpen,
  mode,
  taskData,
  onDismiss,
}) => {
  const [formData, setFormData] = React.useState<any>({
    taskName: "",
    taskDesc: "",
    status: "inprogress",
  });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: MessageType;
    text: string;
  }>({ type: null, text: "" });
  const addTodo = useTodoStore((c) => c.addTodo)
  const updateTodo = useTodoStore((c) => c.updateTodo)
  const todo = useTodoStore((c) => c.todos)
  React.useEffect(() => {
    if (mode === "edit" && taskData) {
      setFormData(taskData);
    } else {
      setFormData({
        taskName: "",
        taskDesc: "",
        status: "inprogress", // default
      });
    }
  }, [mode, taskData]);
  const handleSave = async () => {
    if (!formData.taskName?.trim()) {
      setMessage({ type: "error", text: "Please enter the task title" });
      autoClearMessage();
      return;
    }

    if (!formData.taskDesc?.trim()) {
      setMessage({ type: "error", text: "Please enter the task description" });
      autoClearMessage();
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));

      if (mode === "add") {
        await addTodo(formData.taskName.trim(), formData.taskDesc, "inprogress");
        setMessage({ type: "success", text: "Task added successfully!" });
      } else if (mode === "edit") {
        await updateTodo(taskData.id, formData.taskName, formData.taskDesc, formData.status);
        setMessage({ type: "success", text: "Task updated successfully!" });
      }
      setTimeout(() => {
        setMessage({ type: null, text: "" });
        onDismiss();
      }, 1000);
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
      autoClearMessage();
    } finally {
      setLoading(false);
    }
  };

  const autoClearMessage = () => {
    setTimeout(() => setMessage({ type: null, text: "" }), 1500);
  };

  return (
    <div>
      <Panel
        headerText={mode === "edit" ? "Edit Task" : "Add Task"}
        type={PanelType.custom}
        customWidth="400px"
        isOpen={isOpen}
        onDismiss={onDismiss}
        closeButtonAriaLabel="Close"
        styles={{
          headerText: {
            color: "white",
            fontSize: 18,
          },
        }}
      >
        {message.type && (
          <MessageBar
            messageBarType={
              message.type === "success"
                ? MessageBarType.success
                : MessageBarType.error
            }
            isMultiline={false}
          >
            {message.text}
          </MessageBar>
        )}

        <div className='textfieldalign'>
          <TextField
            placeholder="Enter the task title"
            value={formData?.taskName}
            onChange={(_event, newValue) => {
              setFormData((prev: any) => ({
                ...prev,
                taskName: newValue
              })
              )
            }
            }
          />
          <TextField
            placeholder="Enter the task description"
            value={formData?.taskDesc}
            onChange={(_event, newValue) => {
              setFormData((prev: any) => ({
                ...prev,
                taskDesc: newValue
              })
              )
            }
            }
            multiline
          />
          {mode == "edit" &&
            <Dropdown
              placeholder='select Status'
              options={statusOptions}
              selectedKey={formData?.status}
              onChange={(event, option: any) => {
                setFormData((prev: any) => ({
                  ...prev,
                  status: option?.key
                })
                )
              }
              }
            />
          }
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 8 }}>
          <DefaultButton text="Cancel" onClick={onDismiss} />
          {/* text={mode === "edit" ? "Update" : "Add"}  */}
          <PrimaryButton onClick={handleSave}>
            {!loading && (
              <span style={{ fontWeight: 600 }}>
                {mode === "edit" ? "Update" : "Add"}
              </span>
            )}
            {loading ? (
              <div className="fase_in_out_loading_dev_pulsing_animation">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : null}    </PrimaryButton>
        </div>

      </Panel>
    </div>
  )
}

export default AddEdit