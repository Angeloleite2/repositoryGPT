GRANT INSERT ON public.contact_messages TO anon;

CREATE POLICY "Public visitors can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(btrim(email)) BETWEEN 3 AND 255
  AND position('@' in email) > 1
  AND char_length(btrim(message)) BETWEEN 1 AND 1500
  AND (company IS NULL OR char_length(company) <= 160)
  AND (phone IS NULL OR char_length(phone) <= 60)
);