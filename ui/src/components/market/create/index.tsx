import { CONTRACT_ADRESSES } from "@/contracts/addresses";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import { FC, useState } from "react";


export const CreateMarket: FC<any> = ({ color, className, ...rest }) => {

    // MarketChoiceParam yapısına uygun bir state
    interface MarketChoiceParam {
    name: string;
    tokenAddress: string;
  }

  const [options, setOptions] = useState<MarketChoiceParam[]>([
    { name: '', tokenAddress: '' },
  ]);
  

    // Yeni bir seçenek ekleme
    const addOption = () => {
        setOptions([...options, { name: '', tokenAddress: '' }]);
      };
    
      // Bir seçeneği kaldırma
      const removeOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
      };
    
      // Seçenek değerini güncelleme
      const updateOption = (index: number, field: keyof MarketChoiceParam, newValue: string) => {
        const updatedOptions = options.map((option, i) =>
          i === index ? { ...option, [field]: newValue } : option
        );
        setOptions(updatedOptions);
      };
    

    const handleSubmit = () => {
      // Form submit işlemi burada yapılabilir
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("LogoURI:", logoURI);
      console.log("Options:", options);
    };
  
    // Anket başlığı ve diğer alanlar için state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [logoURI, setLogoURI] = useState('');

    return(<>
        <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
      <div className="w-full">
        <div className="flex w-full flex-col gap-4">
          <Input
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            label="LogoURI"
            value={logoURI}
            onChange={(e) => setLogoURI(e.target.value)}
          />

            {options.map((option, index) => (
            <Card key={index} className="flex flex-col gap-2 p-2">
              <Input
                type="text"
                label={`Option ${index + 1} Name`}
                value={option.name}
                onChange={(e) => updateOption(index, 'name', e.target.value)}
              />
             
             <Select
                label={`Option ${index + 1} Token Address`}
                value={option.tokenAddress}
                //@ts-ignore
                onChange={(e) => updateOption(index, 'tokenAddress', e as string)} // Seçilen değeri güncelle
              >
                {CONTRACT_ADRESSES.FAN_TOKENS.map((token : any) => (
                  <SelectItem key={token.address} value={token.address}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </Select>


              <Button color="danger" onClick={() => removeOption(index)}>
                Remove Option
              </Button>
            </Card>
          ))}
          {/* Yeni seçenek ekleme */}
          <Button color="success" variant="solid"  onClick={addOption}>
            Add Option
          </Button>
        </div>
      </div>

      <div className="w-full">
        <Button fullWidth size="lg" color="secondary"  onClick={handleSubmit}>
          Submit Poll
        </Button>
      </div>
    </div>

         
         
        </div>

    </>)
}