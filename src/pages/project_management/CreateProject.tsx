import { FormProvider, useForm } from "react-hook-form";
import {
  ProjectCreateValidationType,
  projectCreateZodSchema,
} from "./project.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField";
import { useClientListQuery } from "../../store/api/client.api";
import { useProjectCreateMutation } from "../../store/api/project.api";
import toast from "react-hot-toast";

const CreateProject = () => {
  const methods = useForm({
    resolver: zodResolver(projectCreateZodSchema),
  });

  const [projectCreate] = useProjectCreateMutation({});

  const onSubmit = async (data: ProjectCreateValidationType) => {
    try {
      const toasterId = toast.loading("Project creating...");
      data.project.budget = parseInt(data.project.budget as string);
      const result = await projectCreate(data);

      if (result?.data?.success) {
        toast.success("Project created successfully!", { id: toasterId });
        methods.reset();
        return;
      }
      toast.error("Something went wrong!", { id: toasterId });
    } catch (err) {
      console.log(err);
    }
  };

  const { data: clientList } = useClientListQuery(1);

  const clientSelectOptions = clientList?.data?.map((client: any) => ({
    label: client?.name,
    value: client?.id,
  }));

  return (
    <div>
      <h1 className="md:text-xl sm:text-lg text-base font-semibold text-center dark:text-white">
        Create Project
      </h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-6"
        >
          <InputField
            name="project.title"
            label="Title"
            placeholder="Enter title"
            type="text"
            options={{ required: true }}
          />

          <InputField
            name="project.budget"
            label="Budget"
            placeholder="Input budget"
            type="number"
            options={{ required: true }}
          />

          <InputField
            name="project.clientId"
            label="Select client"
            type="select"
            options={{ required: true }}
            placeholder="Select client"
            selectOptions={clientSelectOptions}
          />

          <InputField
            name="project.deadline"
            label="Project deadline"
            type="date"
            options={{ required: true }}
            placeholder="Enter deadline"
          />

          <div className="col-span-2">
            <InputField
              name="project.status"
              label="Project status"
              type="select"
              placeholder="Select status"
              selectOptions={[
                { label: "Pending", value: "PENDING" },
                { label: "In Progress", value: "IN_PROGRESS" },
                { label: "Completed", value: "COMPLETED" },
                { label: "Cancelled", value: "CANCELLED" },
              ]}
            />

            <button className="flex items-center mx-auto mt-5 justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateProject;
