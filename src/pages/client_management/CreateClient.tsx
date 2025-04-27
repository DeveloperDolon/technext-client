import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateClientValidationType,
  createClientZodSchema,
} from "./client.validation";
import InputField from "../../components/InputField";
import { useClientCreateMutation } from "../../store/api/client.api";
import toast from "react-hot-toast";

const CreateClient = () => {
  const methods = useForm({
    resolver: zodResolver(createClientZodSchema),
  });

  const [clientCreate] = useClientCreateMutation({});

  const onSubmit = async (data: CreateClientValidationType) => {
    try {
      const toastId = toast.loading("Client creating...");
      const result = await clientCreate(data);

      if (result?.data?.success) {
        toast.success("Project created successfully!", { id: toastId });
        methods.reset();
        return;
      }
      toast.error("Something went wrong!", { id: toastId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="md:text-xl sm:text-lg text-base font-semibold text-center dark:text-white">
        Create Client
      </h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-7"
        >
          <InputField
            name="client.name"
            type="text"
            placeholder="Input client name"
            label="Client name"
            options={{ required: true }}
          />

          <InputField
            name="client.email"
            type="email"
            placeholder="Input client email"
            label="Client email"
            options={{ required: true }}
          />

          <InputField
            name="client.phone"
            type="text"
            placeholder="Input client phone number"
            label="Client phone"
          />

          <InputField
            name="client.company"
            type="text"
            placeholder="Enter company name"
            label="Company"
          />

          <div className="col-span-2">
            <InputField
              name="client.notes"
              type="textarea"
              placeholder="Input your notes"
              label="Notes"
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

export default CreateClient;
