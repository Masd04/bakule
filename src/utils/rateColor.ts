export const getRateColor = (value: number): string => {
    if (value <= 4) return 'text-cpred'; 
    if (value <= 7) return 'text-cpyellow'; 
    return 'text-cpgreen'; 
  };