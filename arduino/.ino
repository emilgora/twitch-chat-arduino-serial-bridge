const int sprayPin = 10;

void setup()
{
  pinMode(sprayPin,OUTPUT);
  digitalWrite(sprayPin,LOW);
  Serial.begin(9600);
}

void loop()
{
  if(Serial.available() > 0)
  {
    char letter = Serial.read();

    if(letter == '1')
    {
      digitalWrite(sprayPin,HIGH);
    }
    else if(letter == '0')
    {
      digitalWrite(sprayPin,LOW);
    }
  }
}
