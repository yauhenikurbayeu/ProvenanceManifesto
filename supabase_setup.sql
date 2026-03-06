-- 1. Create the signatures table
create table public.signatures (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  language text not null default 'en',
  consent_given boolean not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the obfuscation function
create or replace function public.obfuscate_signature_name()
returns trigger as $$
declare
    word text;
    words text[];
    obfuscated_word text;
    obfuscated_name text := '';
    i int;
begin
    -- Split the name into words
    words := string_to_array(NEW.name, ' ');
    
    -- Iterate through each word
    foreach word in array words
    loop
        obfuscated_word := '';
        
        -- Iterate through each character of the word
        for i in 1..length(word) loop
            if i % 2 = 0 then
                obfuscated_word := obfuscated_word || '*';
            else
                obfuscated_word := obfuscated_word || substr(word, i, 1);
            end if;
        end loop;
        
        -- Rebuild the full name with spaces
        if obfuscated_name = '' then
            obfuscated_name := obfuscated_word;
        else
            obfuscated_name := obfuscated_name || ' ' || obfuscated_word;
        end if;
    end loop;
    
    -- Assign the obfuscated result back to the record before insert
    NEW.name := obfuscated_name;
    
    return NEW;
end;
$$ language plpgsql;

-- 3. Create the trigger to execute before INSERT
create trigger trigger_obfuscate_signature_name
    before insert on public.signatures
    for each row
    execute function public.obfuscate_signature_name();
