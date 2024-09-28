import React, { useState } from 'react';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { CONTRACT_ADRESSES } from '@/contracts/addresses';
import { GetContractAt, GetSigner } from '@/utils/web3';
import { ARENA_DIAMOND_CONTRACT } from '@/utils/constants';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';

// TypeScript yapıları
interface MarketChoiceParam {
    name: string;
    tokenAddress: string;
}

interface MarketCreationParams {
    startedAt: number;
    expiredAt: number;
    vestingPeriod: number;
    title: string;
    description: string;
    logo: string;
    choices: MarketChoiceParam[];
}

export const MarketCreationForm = () => {
    const [isLoading,setLoaded] = useState(false)
    const { walletProvider } = useWeb3ModalProvider();

    // Form alanları için state
    const [marketParams, setMarketParams] = useState<MarketCreationParams>({
        startedAt: Date.now(),
        expiredAt: Date.now() + 86400000, // 1 gün sonra (milisaniye cinsinden)
        vestingPeriod: 0,
        title: '',
        description: '',
        logo: '',
        choices: [{ name: '', tokenAddress: '' }],
    });

    // Form alanlarını güncelleme fonksiyonu
    const updateField = (field: keyof MarketCreationParams, value: any) => {
        setMarketParams((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateChoice = (index: number, field: keyof MarketChoiceParam, value: string) => {
        console.log("Updated Value:", value);  // Seçilen değeri kontrol etmek için log ekleyin
        const updatedChoices = marketParams.choices.map((choice, i) =>
          i === index ? { ...choice, [field]: value } : choice
        );
        setMarketParams((prev) => ({
          ...prev,
          choices: updatedChoices,
        }));
      };

    // Yeni bir seçenek ekleme fonksiyonu
    const addChoice = () => {
        setMarketParams((prev) => ({
            ...prev,
            choices: [...prev.choices, { name: '', tokenAddress: '' }],
        }));
    };

    // Bir seçeneği silme fonksiyonu
    const removeChoice = (index: number) => {
        setMarketParams((prev) => ({
            ...prev,
            choices: prev.choices.filter((_, i) => i !== index),
        }));
    };

    // Formu submit etme fonksiyonu
    const handleSubmit = async () => {
        console.log("Form verileri:", marketParams);

        
            try {
              setLoaded(true)
        
              const signer = await GetSigner(walletProvider);
              const contract = GetContractAt(ARENA_DIAMOND_CONTRACT);
        
              let depositOverrides = {
                value: 0,
              };
        
              const tx = await contract
                .connect(signer)
                // @ts-ignore
                .create(marketParams);
        
              await tx.wait();
              setLoaded(false)
            
            } catch (error) {
                console.log(error)
            setLoaded(false)
            }
          
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <Input
                type="text"
                label="Title"
                value={marketParams.title}
                onChange={(e) => updateField('title', e.target.value)}
            />
            <Input
                type="text"
                label="Description"
                value={marketParams.description}
                onChange={(e) => updateField('description', e.target.value)}
            />
            <Input
                type="text"
                label="Logo URI"
                value={marketParams.logo}
                onChange={(e) => updateField('logo', e.target.value)}
            />
            <Input
                type="number"
                label="Started At (Unix Timestamp)"
                value={marketParams.startedAt.toString()}
                onChange={(e) => updateField('startedAt', parseInt(e.target.value))}
            />
            <Input
                type="number"
                label="Expired At (Unix Timestamp)"
                value={marketParams.expiredAt.toString()}
                onChange={(e) => updateField('expiredAt', parseInt(e.target.value))}
            />
            <Input
                type="number"
                label="Vesting Period (Unix Timestamp)"
                value={marketParams.vestingPeriod.toString()}
                onChange={(e) => updateField('vestingPeriod', parseInt(e.target.value))}
            />

            {/* Dinamik olarak seçenek ekleme */}
            {marketParams.choices.map((choice, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <Input
                        type="text"
                        label={`Option ${index + 1} Name`}
                        value={choice.name}
                        onChange={(e) => updateChoice(index, 'name', e.target.value)}
                    />
                    <Select
                        label={`Option ${index + 1} Token Address`}
                        value={choice.tokenAddress}
                        selectionMode='single'
                        onChange={(e: any) => updateChoice(index, 'tokenAddress', e.target.value)} // Seçilen değeri doğrudan kullanıyoruz
                    >
                        {CONTRACT_ADRESSES.FAN_TOKENS.map((token: any) => (
                            <SelectItem key={token.address} value={token.address}>
                                {token.name} {token.symbol}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button color="danger" onClick={() => removeChoice(index)}>
                        Remove Option
                    </Button>
                </div>
            ))}

            {/* Yeni seçenek ekle butonu */}
            <Button color="success" onClick={addChoice}>
                Add Option
            </Button>

            {/* Submit butonu */}
            <Button isLoading={isLoading} color="danger" onClick={handleSubmit}>
                Create Market
            </Button>
        </div>
    );
};

export default MarketCreationForm;