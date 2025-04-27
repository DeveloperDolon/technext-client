import { FormProvider, useForm } from "react-hook-form";
import {
  ProjectCreateValidationType,
  projectCreateZodSchema,
} from "./project.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField";
import { useClientListQuery } from "../../store/api/client.api";

const CreateProject = () => {
  const methods = useForm({
    resolver: zodResolver(projectCreateZodSchema),
  });

  const onSubmit = (data: ProjectCreateValidationType) => {
    console.log(data);
  };

  const { data: clientList } = useClientListQuery(1);
  console.log(clientList);
  return (
    <div>
      <h1 className="md:text-xl sm:text-lg text-base font-semibold text-center">
        Create Project
      </h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            options={{required: true}}
          />

          <InputField
            name="project.clientId"
            label="Select client"
            // options={}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateProject;
