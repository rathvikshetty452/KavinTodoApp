import { DefaultButton, Dropdown, Panel, PrimaryButton, TextField, type IDropdownOption } from '@fluentui/react'
import React from 'react'
import { useTodoStore } from '../store/useTodoStore';
interface AddEditprops {
  isOpen: boolean;
  mode: "add" | "edit";
  taskData?: any;
  onDismiss: () => void;
  // onSave?: any;
  // setAllitems: any;
  // allitems: any;
}
const statusOptions: IDropdownOption[] = [
  { key: "inprogress", text: "inprogress" },
  { key: "Pending", text: "Pending" },
  { key: "Completed", text: "Completed" },
];

const AddEdit: React.FC<AddEditprops> = ({
  isOpen, 
  mode, 
  taskData, 
  onDismiss, 
  //  setAllitems, 
  //  allitems
}) => {
  const [formData, setFormData] = React.useState<any>({
    taskName: "",
    taskDesc: "",
    status: "pending",
  });
  const [loading, setLoading] = React.useState(false);
  
  const addTodo = useTodoStore((c) => c.addTodo)
    const updateTodo = useTodoStore((c) => c.updateTodo)
  
  React.useEffect(() => {
    if (mode === "edit" && taskData) {
      setFormData(taskData);
    } else {
      setFormData({
        taskName: "",
        taskDesc: "",
        status: "Pending", // default
      });
    }
  }, [mode, taskData]);
  const handleSave = async () => {
    setLoading(true);
    if (!formData.taskName?.trim()) return; // optional basic validation
    await new Promise((res) => setTimeout(res, 1000));
    if (mode === "add") {
      // const newTask = {
      //   id: Date.now(),
      //   taskName: formData.taskName,
      //   taskDesc: formData.taskDesc,
      //   status: "pending",
      //   date: new Date().toISOString(),
      // };
      // setAllitems([...allitems, newTask]);
      addTodo(formData.taskName,formData.taskDesc,"Pending")
    } else if (mode === "edit") {
      // const updatedList = allitems.map((item: any) =>
      //   item.id === taskData.id ? { ...item, ...formData } : item
      // );
      // setAllitems(updatedList);
      updateTodo(taskData.id,formData.taskName,formData.taskDesc,formData.status)
    }
    setLoading(false);
    onDismiss();
  };
  return (
    <div>
      <Panel
        headerText={mode === "edit" ? "Edit Task" : "Add Task"}
        isOpen={isOpen}
        onDismiss={onDismiss}
        closeButtonAriaLabel="Close"
        styles={{
          //      header: {
          //   backgroundColor: "#0078d4", // your color here
          //   color: "white",
          //   padding: "12px 24px",
          // }, 
          headerText: {
            color: "white",
            //   fontWeight: "bold",
            fontSize: 18,
          },
        }}
      >
        <TextField
          label="Enter the title"
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
          label="Enter the description"
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
          <div style={{ marginTop: "5px" }}>
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
          </div>
        }
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 8 }}>
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